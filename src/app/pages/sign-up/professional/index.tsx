import { Controller, useForm } from 'react-hook-form'
import { SignUpForm } from './types/sign-up-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpFormSchema } from './schemas/sign-up-form-schema'
import { AtomButton, AtomDateField, AtomSelectField, AtomTextField } from 'src/app/components'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PhoneIcon from '@mui/icons-material/Phone'
import { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import InputMask from 'react-input-mask'
import { useApi } from 'src/app/hooks'
import { genderOptions, languageOptions, typeOptions } from 'src/constants'
import './styles.scss'

type Props = {
    submit: (value: string) => void
}

export const SignUpProfessional = ({ submit }: Props) => {

    const { post } = useApi()

    const [hidePassword, setHidePassword] = useState<boolean>(true)

    const [loading, setLoading] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid: formIsValid }
    } = useForm<SignUpForm>({
        resolver: yupResolver(signUpFormSchema),
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: {
            cpf: '',
            crp: '',
            abstract: '',
            birthDate: '',
            confirmPassword: '',
            email: '',
            gender: undefined,
            languages: ['pt-br'],
            name: '',
            password: '',
            phoneNumber: '',
            surname: '',
            type: undefined
        }
    })

    const submitHandler = (value: SignUpForm) => {
        setLoading(true)

        const { confirmPassword, ...payload } = value

        post('/professional', payload, false)
            .then(() => submit(value.email))
            .finally(() => setLoading(false))
    }

    return (
        <form id='sign-up-professional' onSubmit={handleSubmit(submitHandler)}>
            <Controller
                name='name'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        {...field}
                        required
                        id='name'
                        type='text'
                        label='Nome'
                        autoFocus
                        error={!!formErrors.name}
                        helperText={formErrors.name?.message}
                    />
                )}
            />

            <Controller
                name='surname'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='surname'
                        type='text'
                        label='Sobrenome'
                        error={!!formErrors.surname}
                        helperText={formErrors.surname?.message}
                    />
                )}
            />

            <Controller
                name='cpf'
                control={control}
                render={({ field }) => (
                    <InputMask
                        mask='999.999.999-99'
                        {...field}
                    >
                        <TextField
                            id='cpf'
                            label='CPF'
                            error={!!formErrors.cpf}
                            helperText={formErrors.cpf?.message}
                            required
                        />
                    </InputMask>
                )}
            />

            <Controller
                name='crp'
                control={control}
                render={({ field }) => (
                    <InputMask
                        mask='99/99999'
                        {...field}
                    >
                        <TextField
                            id='crp'
                            label='Número CRP'
                            error={!!formErrors.crp}
                            helperText={formErrors.crp?.message}
                            required
                        />
                    </InputMask>
                )}
            />

            <Controller
                name='email'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='email'
                        type='text'
                        label='E-mail'
                        error={!!formErrors.email}
                        helperText={formErrors.email?.message}
                        startAdornment={<EmailIcon />}
                    />
                )}
            />

            <Controller
                name='password'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='password'
                        type={hidePassword ? 'password' : 'text'}
                        label='Senha'
                        error={!!formErrors.password}
                        helperText={formErrors.password?.message}
                        startAdornment={<PasswordIcon />}
                        endAdornment={(
                            <IconButton onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )}
                    />
                )}
            />

            <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='confirmPassword'
                        type={hidePassword ? 'password' : 'text'}
                        label='Confirmar senha'
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword?.message}
                        startAdornment={<PasswordIcon />}
                        endAdornment={(
                            <IconButton onClick={() => setHidePassword(!hidePassword)}>
                                {hidePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        )}
                    />
                )}
            />

            <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                    <InputMask
                        mask='(99) 99999-9999'
                        {...field}
                    >
                        <TextField
                            id='phoneNumber'
                            label='Celular'
                            error={!!formErrors.phoneNumber}
                            helperText={formErrors.phoneNumber?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <PhoneIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </InputMask>
                )}
            />

            <Controller
                name='gender'
                control={control}
                render={({ field }) => (
                    <AtomSelectField
                        required
                        {...field}
                        id='gender'
                        label='Gênero'
                        error={!!formErrors.gender}
                        helperText={formErrors.gender?.message}
                        options={genderOptions}
                    />
                )}
            />

            <Controller
                name='birthDate'
                control={control}
                render={({ field }) => (
                    <AtomDateField
                        required
                        {...field}
                        label='Data de Nascimento'
                        error={!!formErrors.birthDate}
                        helperText={formErrors.birthDate?.message}
                        disableFuture
                        disableTyping
                    />
                )}
            />

            <Controller
                name='type'
                control={control}
                render={({ field }) => (
                    <AtomSelectField
                        required
                        {...field}
                        id='type'
                        label='Especialização'
                        error={!!formErrors.type}
                        helperText={formErrors.type?.message}
                        options={typeOptions}
                    />
                )}
            />

            <Controller
                name='languages'
                control={control}
                render={({ field }) => (
                    <AtomSelectField
                        required
                        {...field}
                        id='languages'
                        label='Idiomas de atendimento'
                        error={!!formErrors.languages}
                        helperText={formErrors.languages?.message}
                        multiple
                        options={languageOptions}
                    />
                )}
            />

            <Controller
                name='abstract'
                control={control}
                render={({ field }) => (
                    <AtomTextField
                        required
                        {...field}
                        id='abstract'
                        label='Resumo'
                        error={!!formErrors.abstract}
                        helperText={formErrors.abstract
                            ? formErrors.abstract?.message
                            : 'Insira um breve texto que servirá para lhe introduzir os usuários da plataforma'
                        }
                        multiline
                        maxRows={10}
                    />
                )}
            />

            <AtomButton
                variant='contained'
                type='submit'
                disabled={!formIsValid}
                loading={loading}
            >
                Criar conta
            </AtomButton>
        </form>
    )
}