import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from '@/components/ui/multi-select'

const FormMultiSelect = ({ field }: any) => {
	return (
		<MultiSelector values={field.value} onValuesChange={field.onChange} loop className='max-w-xs'>
			<MultiSelectorTrigger>
				<MultiSelectorInput placeholder='Select languages' />
			</MultiSelectorTrigger>
			<MultiSelectorContent>
				<MultiSelectorList>
					<MultiSelectorItem value={'React'}>React</MultiSelectorItem>
					<MultiSelectorItem value={'Vue'}>Vue</MultiSelectorItem>
					<MultiSelectorItem value={'Svelte'}>Svelte</MultiSelectorItem>
				</MultiSelectorList>
			</MultiSelectorContent>
		</MultiSelector>
	)
}

export default FormMultiSelect
