import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useSnackbar } from './useSnackbar'
import { env } from 'src/constants'
import { usePerson } from './usePerson'

export const useApi = () => {
    const { person } = usePerson()
    const { createSnack } = useSnackbar()

    const authConfig: AxiosRequestConfig = {
        headers: {
            'Authorization': 'Bearer ' + person?.accessToken
        }
    }

    const successCallback = (response: AxiosResponse<any, any>) => (
        response.data
    )
    
    const errorCallback = (error: any) => {
        console.error(error)

        const errorMsg = error?.response?.data?.message || 'Um erro inesperado aconteceu, tente novamente' 
        createSnack(errorMsg, 'error')

        return Promise.reject(error)
    }

    const get = (url: string, useAuth = true) => {
        return axios.get(`${env.apiUrl}${url}`, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const post = (url: string, payload: any, useAuth = true) => {
        return axios.post(`${env.apiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const patch = (url: string, payload: any, useAuth = true) => {
        return axios.patch(`${env.apiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const put = (url: string, payload: any, useAuth = true) => {
        return axios.put(`${env.apiUrl}${url}`, payload, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    const del = (url: string, useAuth = true) => {
        return axios.delete(`${env.apiUrl}${url}`, useAuth ? authConfig : undefined)
            .then(successCallback)
            .catch(errorCallback)
    }

    return {
        axios,
        get,
        post,
        patch,
        put,
        del
    }
}