import { ReactNode, createContext, useState } from 'react'
import { useDebounce } from '../lib/hooks'

type TSearchTextContext = {
	searchText: string
	setSearchText: React.Dispatch<React.SetStateAction<string>>
	debouncedValue: string
}

export const SearchTextContext = createContext<TSearchTextContext | null>(null)

export default function SearchTextContextProvider({
	children,
}: {children: ReactNode}) {
	const [searchText, setSearchText] = useState('')
	const debouncedValue = useDebounce(searchText, 300)


	return (
		<SearchTextContext.Provider
			value={{
				searchText,
				setSearchText,
				debouncedValue
			}}
		>
			{children}
		</SearchTextContext.Provider>
	)
}

