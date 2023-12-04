import { IProfile } from "../../../types";
import { baseApi } from "../api";

export const profileApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
        getProfile: builder.query<IProfile,void>({
            query: () =>( {url:'/profile'}),
        }),
        
        updateProfile: builder.mutation<IProfile,IProfile>({
            query: (data) =>({
                url:'/profile',
                method:'PATCH',
                body:data,
            }),
          
        }),
       

}) 

})


export const {useGetProfileQuery,useUpdateProfileMutation} = profileApi