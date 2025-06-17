import { ReactNode, useState } from 'react'
import { Center, Pagination, Text } from '@mantine/core'
import { PaginatedResponse } from '../../types/pagination'
import { UseQueryResult } from '@tanstack/react-query'

interface PaginatedQueryProps<T> {
    query: UseQueryResult<PaginatedResponse<T>, Error>
    render: (items: T[]) => ReactNode
    limit?: number
    onPageChange?: (page: number) => void
    currentPage?: number
}

export const PaginatedQuery = <T,>({
    query,
    render,
    onPageChange,
    currentPage: externalPage,
}: PaginatedQueryProps<T>) => {
    const [internalPage, setInternalPage] = useState(1)
    const { data, isLoading, isError, error } = query

    if (isLoading) {
        return <Text>Loading...</Text>
    }

    if (isError) {
        return <Text color="red">Error: {error.message}</Text>
    }

    if (!data) {
        return <Text>No data available</Text>
    }

    const { items, meta } = data
    const page = externalPage ?? internalPage
    const handlePageChange = (newPage: number) => {
        setInternalPage(newPage)
        onPageChange?.(newPage)
    }

    return (
        <>
            {render(items)}
            <Center>
                <Pagination
                    value={page}
                    onChange={handlePageChange}
                    total={meta.totalPages}
                />
            </Center>
        </>
    )
}
