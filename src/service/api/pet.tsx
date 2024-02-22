import { API_URL } from "@env";
import { BaseApiService } from "./BaseApi";
import { useLoadingContext } from "../../context/loadingHelper";


export const usePet = () => {
    const baseApi = new BaseApiService();
    const {showLoading, hideLoading} = useLoadingContext();

    const onGetAllPet = async (page?: number, take?: number, species?: string, userId?: string) => {
        showLoading();
        const res = await baseApi.get(`${API_URL}/pets/get-all-pets?page=${page}&take=${take}&species=${species}&userId=${userId}`);
        hideLoading();
        return res;
    };

    const onCreatePet = async (image?: string, dob?: string, gender?: string, furColor?: string, description?: string, name?: string, species?: string) => {
        showLoading();                
        const res = await baseApi.post(`${API_URL}/pets`, {
            s3ImagePet: image,
            dateOfBirth: dob,
            gender: gender,
            furColor: furColor,
            description: description,
            name: name,
            species: species
        });
        hideLoading();
        return res;
    };


    const onUpdatePet = async (id?: string, image?: string, dob?: string, gender?: string, furColor?: string, description?: string, name?: string, species?: string, isRemoveImage?: boolean) => {
        showLoading();                
        const res = await baseApi.patch(`${API_URL}/pets/${id}`, {
            s3ImagePet: image,
            dateOfBirth: dob,
            gender: gender,
            furColor: furColor,
            description: description,
            name: name,
            species: species,
            // isRemoveImage: isRemoveImage
        });
        hideLoading();
        return res;
    };

    const onUpdateHavePet = async () => {
        showLoading();        
        const res = await baseApi.post(`${API_URL}/pets/update-have-pet`);
        hideLoading();
        return res;
    }; 
    

    const onDeletePet = async (petId: any) => {
        showLoading();
        const res = await baseApi.delete(`${API_URL}/pets/${petId}`);
        hideLoading();
        return res;
    }; 
    



    return { onGetAllPet, onCreatePet, onUpdateHavePet, onDeletePet, onUpdatePet };
}; 