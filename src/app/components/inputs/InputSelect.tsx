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
            render={({ field, fieldState: { error } }) => {
                const { onChange, value } = field

                const onSelect = (val: string | null) => {
                    onChange(Number(val))
                }

                return (
                    <Select
                        onChange={onSelect}
                        value={value ? value.toString() : undefined}
                        error={error?.message}
                        {...props}
                    />
                )
            }}
        />
    )
}
