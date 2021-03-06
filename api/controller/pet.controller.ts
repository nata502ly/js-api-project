import {URLSearchParams} from 'url';
import {definitions, operations} from "../../.temp/types";
import {JsonRequestWithValidation} from "../request";

export class PetController {
    async getById(id: number | string){
        return (await new JsonRequestWithValidation()
            .url(`http://93.126.97.71:10080/api/pet/${id}`)
            .send<operations['getPetById']['responses']['200']['schema']>()
        ).body;
    }

    async getByTag(tags: string | string[]){
        return(await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet/findByTags')
                .searchParams(new URLSearchParams({tags}))
                .send<operations['findPetsByTags']['responses']['200']['schema']>()
        ).body
    }

    async getByStatus(status: string | string[]){
        return(await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet/findByStatus')
                .searchParams(new URLSearchParams({status}))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
    }

    async addNew(pet: Omit<definitions['Pet'], 'id'>){

        return(await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet')
                .method('POST')
                .body(pet)
                .send<operations['addPet']['responses']['200']['schema']>()
        ).body
    }

    async delete(id: number | string) {

        return(await new JsonRequestWithValidation()
                .url(`http://93.126.97.71:10080/api/pet/${id}`)
                .method('DELETE')
                .send<definitions['AbstractApiResponse']>()
        ).body
    }

    async update(pet: definitions['Pet']){

        return(await new JsonRequestWithValidation()
                .url('http://93.126.97.71:10080/api/pet')
                .method('PUT')
                .body(pet)
                .send<operations['updatePet']['responses']['200']['schema']>()
        ).body
    }
}
