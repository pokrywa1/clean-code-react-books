import { TextInput, TextInputProps } from '@mantine/core'
import { Controller, useFormContext } from 'react-hook-form'

type InputTextProps = TextInputProps
export const InputText = ({ ...props }: InputTextProps) => {
    return <TextInput {...props} />
}

type InputTextPropsRHF = InputTextProps & {
    name: string
}

export const InputTextRHF = ({ name, ...props }: InputTextPropsRHF) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                const { onChange, value } = field
                return (
                    <TextInput
                        onChange={(e) => onChange(e.currentTarget.value)}
                        value={value || ''}
                        {...props}
                    />
                )
            }}
        />
    )
}
