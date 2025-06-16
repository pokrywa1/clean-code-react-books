import { Select, SelectProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'

type InputSelectProps = SelectProps

export const InputSelect = ({ ...props }: InputSelectProps) => {
    return <Select {...props} />
}

type InputSelectPropsRHF = InputSelectProps & {
    name: string
}

export const InputSelectRHF = ({ name, ...props }: InputSelectPropsRHF) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { onChange, value } = field
                return (
                    <Select
                        onChange={onChange}
                        value={value || null}
                        {...props}
                    />
                )
            }}
        />
    )
}
