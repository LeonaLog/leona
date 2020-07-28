// @flow strict
import * as Immutable from 'immutable';

import type {
  Grantee as GranteeType,
  Capability as CapabilityType,
  ShareEntity as ShareEntityType,
  ActiveShare as ActiveShareType,
  GRN,
} from 'logic/permissions/types';
import { defaultCompare } from 'views/logic/DefaultCompare';

import Capability from './Capability';
import Grantee from './Grantee';
import ActiveShare from './ActiveShare';
import ShareEntity from './ShareEntity';
import SelectedGrantee from './SelectedGrantee';
import type { GranteeInterface } from './GranteeInterface';

export type AvailableGrantees = Immutable.List<Grantee>;
export type AvailableCapabilities = Immutable.List<Capability>;
export type ActiveShares = Immutable.List<ActiveShare>;
export type MissingDependencies = Immutable.Map<GRN, Immutable.List<ShareEntity>>;
export type SelectedGranteeCapabilities = Immutable.Map<$PropertyType<GranteeType, 'id'>, $PropertyType<CapabilityType, 'id'>>;
export type SelectedGrantees = Immutable.List<SelectedGrantee>;

const mockMissingDependencies = () => {
  const owner1 = Grantee
    .builder()
    .id('grn::::user:jane')
    .title('Jane Doe')
    .type('user')
    .build();

  const owner2 = Grantee
    .builder()
    .id('grn::::team:reporting')
    .title('Reporting')
    .type('team')
    .build();

  const missingDependecy = ShareEntity
    .builder()
    .id('grn::::stream:57bc9188e62a2373778d9e03')
    .type('stream')
    .title('Security Data')
    .owners(Immutable.List([owner1, owner2]))
    .build();

  return Immutable.Map({ 'grn::::team:abc123': Immutable.List([missingDependecy]) });
};

const _sortAndOrderGrantees = <T: GranteeInterface>(grantees: Immutable.List<T>): Immutable.List<T> => {
  const granteesByType = grantees
    .sort((granteeA, granteeB) => defaultCompare(granteeA.title, granteeB.title))
    .groupBy((grantee) => grantee.type);

  return Immutable.List().concat(
    granteesByType.get('global'),
    granteesByType.get('team'),
    granteesByType.get('user'),
  ).filter((grantee) => grantee);
};

type InternalState = {|
  entity: GRN,
  availableGrantees: AvailableGrantees,
  availableCapabilities: AvailableCapabilities,
  activeShares: ActiveShares,
  selectedGranteeCapabilities: SelectedGranteeCapabilities,
  missingDependencies: MissingDependencies,
|};

export type EntityShareStateJson = {|
  entity: $PropertyType<InternalState, 'entity'>,
  available_grantees: Array<GranteeType>,
  available_capabilities: Array<CapabilityType>,
  active_shares: Array<ActiveShareType>,
  selected_grantee_capabilities: {|
    [grantee: $PropertyType<Grantee, 'id'>]: $PropertyType<Capability, 'id'>,
  |} | {||},
  missing_permissions_on_dependencies: {[GRN]: Array<ShareEntityType>},
|};

export default class EntityShareState {
  _value: InternalState;

  constructor(
    entity: $PropertyType<InternalState, 'entity'>,
    availableGrantees: $PropertyType<InternalState, 'availableGrantees'>,
    availableCapabilities: $PropertyType<InternalState, 'availableCapabilities'>,
    activeShares: $PropertyType<InternalState, 'activeShares'>,
    selectedGranteeCapabilities: $PropertyType<InternalState, 'selectedGranteeCapabilities'>,
    missingDependencies: $PropertyType<InternalState, 'missingDependencies'>,
  ) {
    this._value = {
      entity,
      availableGrantees: _sortAndOrderGrantees<Grantee>(availableGrantees),
      availableCapabilities: availableCapabilities,
      activeShares,
      selectedGranteeCapabilities: selectedGranteeCapabilities,
      missingDependencies: missingDependencies || mockMissingDependencies(),
    };
  }

  get entity(): $PropertyType<InternalState, 'entity'> {
    return this._value.entity;
  }

  get availableGrantees(): $PropertyType<InternalState, 'availableGrantees'> {
    return this._value.availableGrantees;
  }

  get availableCapabilities(): $PropertyType<InternalState, 'availableCapabilities'> {
    return this._value.availableCapabilities;
  }

  get activeShares(): $PropertyType<InternalState, 'activeShares'> {
    return this._value.activeShares;
  }

  get selectedGranteeCapabilities(): $PropertyType<InternalState, 'selectedGranteeCapabilities'> {
    return this._value.selectedGranteeCapabilities;
  }

  get missingDependencies(): $PropertyType<InternalState, 'missingDependencies'> {
    return this._value.missingDependencies;
  }

  get selectedGrantees() {
    const _userLookup = (userId: GRN) => this._value.availableGrantees.find((grantee) => grantee.id === userId);

    const granteesWithCapabilities: Immutable.List<SelectedGrantee> = this._value.selectedGranteeCapabilities.entrySeq().map(([granteeId, roleId]) => {
      const grantee = _userLookup(granteeId);

      if (!grantee) {
        throw new Error(`Cannot find grantee with id ${granteeId} in available grantees`);
      }

      return SelectedGrantee.create(grantee.id, grantee.title, grantee.type, roleId);
    }).toList();

    return _sortAndOrderGrantees<SelectedGrantee>(granteesWithCapabilities);
  }

  // eslint-disable-next-line no-use-before-define
  toBuilder(): Builder {
    const {
      entity,
      availableGrantees,
      availableCapabilities,
      activeShares,
      selectedGranteeCapabilities,
      missingDependencies,
    } = this._value;

    // eslint-disable-next-line no-use-before-define
    return new Builder(Immutable.Map({
      entity,
      availableGrantees,
      availableCapabilities: availableCapabilities,
      activeShares,
      selectedGranteeCapabilities: selectedGranteeCapabilities,
      missingDependencies,
    }));
  }

  toJSON() {
    const {
      entity,
      availableGrantees,
      availableCapabilities,
      activeShares,
      selectedGranteeCapabilities,
      missingDependencies,
    } = this._value;

    return {
      entity,
      available_grantees: availableGrantees,
      available_capabilities: availableCapabilities,
      active_shares: activeShares,
      selected_grantee_capabilities: selectedGranteeCapabilities,
      missing_permissions_on_dependencies: missingDependencies,
    };
  }

  static fromJSON(value: EntityShareStateJson): EntityShareState {
    /* eslint-disable camelcase */
    const {
      entity,
      available_grantees,
      available_capabilities,
      active_shares,
      selected_grantee_capabilities,
      missing_permissions_on_dependencies,
    } = value;

    const availableGrantees = Immutable.fromJS(available_grantees.map((ag) => Grantee.fromJSON(ag)));
    const availableCapabilities = Immutable.fromJS(available_capabilities.map((ar) => Capability.fromJSON(ar)));
    const activeShares = Immutable.fromJS(active_shares.map((as) => ActiveShare.fromJSON(as)));
    const selectedGranteeCapabilities = Immutable.fromJS(selected_grantee_capabilities);
    const missingDependencies = Immutable.fromJS(
      Object.entries(missing_permissions_on_dependencies).map(
        ([granteeGRN, dependencyList]) => ({
          // $FlowFixMe: Object entries returns mixed value
          [granteeGRN]: dependencyList.map((dependency) => ShareEntity.fromJSON(dependency)),
        }),
      ),
    );

    /* eslint-enable camelcase */
    return new EntityShareState(
      entity,
      availableGrantees,
      availableCapabilities,
      activeShares,
      selectedGranteeCapabilities,
      missingDependencies,
    );
  }

  // eslint-disable-next-line no-use-before-define
  static builder(): Builder {
    // eslint-disable-next-line no-use-before-define
    return new Builder();
  }
}

type InternalBuilderState = Immutable.Map<string, any>;

class Builder {
  value: InternalBuilderState;

  constructor(value: InternalBuilderState = Immutable.Map()) {
    this.value = value;
  }

  entity(value: $PropertyType<InternalState, 'entity'>): Builder {
    return new Builder(this.value.set('entity', value));
  }

  availableGrantees(value: $PropertyType<InternalState, 'availableGrantees'>): Builder {
    return new Builder(this.value.set('availableGrantees', value));
  }

  availableCapabilities(value: $PropertyType<InternalState, 'availableCapabilities'>): Builder {
    return new Builder(this.value.set('availableCapabilities', value));
  }

  activeShares(value: $PropertyType<InternalState, 'activeShares'>): Builder {
    return new Builder(this.value.set('activeShares', value));
  }

  selectedGranteeCapabilities(value: $PropertyType<InternalState, 'selectedGranteeCapabilities'>): Builder {
    return new Builder(this.value.set('selectedGranteeCapabilities', value));
  }

  missingDependencies(value: $PropertyType<InternalState, 'missingDependencies'>): Builder {
    return new Builder(this.value.set('missingDependencies', value));
  }

  build(): EntityShareState {
    const {
      entity,
      availableGrantees,
      availableCapabilities,
      activeShares,
      selectedGranteeCapabilities,
      missingDependencies,
    } = this.value.toObject();

    return new EntityShareState(
      entity,
      availableGrantees,
      availableCapabilities,
      activeShares,
      selectedGranteeCapabilities,
      missingDependencies,
    );
  }
}
