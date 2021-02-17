import {strict as assert} from 'assert'
import {PetController} from "../api/controller/pet.controller";
import {definitions} from "../.temp/types";

const pet = new PetController();


describe('User can', function () {
    it('Receive pet by it id', async function () {
        let body = await pet.getById(1);
        assert(body.id == 1, `Expected to return id = 1 but got ${body.id}`)
    });

    it('receive pet by status', async function () {
        let body = await pet.getByStatus('available');
        assert(body.length > 0);

        body = await pet.getByStatus('pending');
        assert(body.length > 0);

        body = await pet.getByStatus('sold');
        assert(body.length > 0);

        body = await pet.getByStatus(['sold', 'available']);
        assert(body.length > 0);
        assert(body.some(pet => pet.status == 'available'));
        assert(body.some(pet => pet.status == 'sold'));
        assert(!body.some(pet => pet.status == 'pending'));
    });

    it('receive pet by tag', async function() {
        let body = await pet.getByTag('tag1');
        assert(body.length > 0);
        assert(body.every(pet => pet.tags.some(
            tag=> tag.name == 'tag1')));
    });

    it('be added, updated, deleted', async function(){
        const petToCreate: Omit<definitions['Pet'], 'id'> = {
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        const addedPet = await pet.addNew(petToCreate);
        assert.deepEqual(addedPet, {...petToCreate, id: addedPet.id}, 'Expect created pet match data used upon creation');

        const foundPet = await pet.getById(addedPet.id);
        assert.deepEqual(foundPet, {...petToCreate, id: addedPet.id}, ' Expect found pet match created pet');

        const newerPet: definitions['Pet'] = {
            "id": addedPet.id,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "cat",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        const updatedPet = await pet.update(newerPet);

        assert.deepEqual(newerPet, updatedPet, 'Expect updated pet to match data used upon updating');

        await pet.delete(addedPet.id)
        // TODO check 404 error
    });


});
