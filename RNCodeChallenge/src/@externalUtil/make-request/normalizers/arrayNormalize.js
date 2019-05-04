import {normalize, schema} from 'normalizr';
import _ from 'lodash';

const entity = new schema.Entity('data', {}, {
    idAttribute: 'idDrink',
    processStrategy: (entity) => ({
        id: entity.idDrink,
        ..._.omit(entity, 'idDrink')
    })
});

const entityList = [ entity ];

export default function (data) {
    return normalize(data.drinks, entityList)
}
