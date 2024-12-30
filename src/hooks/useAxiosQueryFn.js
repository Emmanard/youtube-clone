import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAxiosFunction = () => {
    // For GET requests
    const useFetchData = (configObj) => {
        const { key, axiosInstance, url, requestConfig = {} } = configObj;
        
        return useQuery({
            queryKey: key,
            queryFn: async () => {
                try {
                    const options = {
                        method: 'GET',
                        url: url,
                        ...requestConfig
                    };
                    
                    const response = await axiosInstance.request(options);
                    return response.data;
                } catch (error) {
                    console.error('Request error:', error);
                    throw error;
                }
            },
            staleTime: 300000,
            retry: 2
        });
    };

    // For POST/PUT/DELETE requests
    const useMutateData = (configObj) => {
        const { axiosInstance, method, url } = configObj;

        return useMutation(
            async (data) => {
                const response = await axiosInstance[method.toLowerCase()](url, data);
                return response.data; // Return the response data
            },
            {
                onError: (error) => {
                    console.error('Error mutating data:', error.message);
                },
                onSuccess: (data) => {
                    console.log('Mutation successful:', data);
                },
            }
        );
    };

    return { useFetchData, useMutateData };
};

export default useAxiosFunction;
