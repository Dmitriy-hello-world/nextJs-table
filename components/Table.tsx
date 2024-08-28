'use client'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { ProductsType } from '../types/productTypes'
import { Pagination } from './Pagination'

export const Table = ({ products }: { products: ProductsType }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [search, setSearch] = useState('')
	const [productList, setProductList] = useState(products)

	const filteredProducts = productList.filter(product =>
		product['Product Name'].toLowerCase().includes(search.toLowerCase())
	)

	const totalItems = filteredProducts.length
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

	const deleteProduct = (trackingId: number) => {
		const updatedProducts = productList.filter(
			product => product['Tracking ID'] !== trackingId
		)
		setProductList(updatedProducts)
	}

	return (
		<div className={`p-4 w-full max-w-8xl mx-auto`}>
			<div className='flex justify-between items-center mb-4'>
				<select
					value={itemsPerPage}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setItemsPerPage(Number(e.target.value))
					}
					className='p-2 border rounded dark:bg-gray-800 dark:text-gray-100'
				>
					{[10, 20, 30].map(n => (
						<option key={n} value={n}>
							{n} per page
						</option>
					))}
				</select>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Search by product name'
					className='flex-1 p-2 border rounded dark:bg-gray-800 dark:text-gray-100'
				/>
			</div>
			<div className='overflow-x-auto'>
				<table className='min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md w-full'>
					<thead>
						<tr className='border-b border-gray-200 dark:border-gray-700'>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Tracking ID
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Product
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Customer
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Date
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Amount
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Payment Mode
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map((product, index) => (
							<tr
								className={`border-b border-gray-200 dark:border-gray-700 ${
									index % 2 === 0
										? 'bg-gray-50 dark:bg-gray-700'
										: 'bg-white dark:bg-gray-800'
								} hover:bg-gray-100 dark:hover:bg-gray-600`}
								key={product['Tracking ID']}
							>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
									#{product['Tracking ID']}
								</td>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100 flex items-center'>
									<img
										src={product['Product Image']}
										alt='product image'
										className='w-10 h-10 mr-4 rounded-full'
									/>
									<span className='truncate' style={{ maxWidth: '150px' }}>
										{product['Product Name']}
									</span>
								</td>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
									{product.Customer}
								</td>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
									{product.Date}
								</td>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
									${product.Amount}
								</td>
								<td className='px-6 py-4 text-sm text-gray-900 dark:text-gray-100'>
									{product['Payment Mode']}
								</td>
								<td className='px-6 py-4 text-sm'>
									<span
										className={`px-2 py-1 font-semibold rounded-full text-sm ${
											product.Status === 'Delivered'
												? 'text-green-700 bg-green-100 border border-green-500'
												: product.Status === 'Cancelled'
												? 'text-red-700 bg-red-100 border border-red-500'
												: product.Status === 'Process'
												? 'text-yellow-700 bg-yellow-100 border border-yellow-500'
												: ''
										}`}
									>
										{product.Status}
									</span>
								</td>
								<td className='px-6 py-4 text-sm'>
									<button
										onClick={() => deleteProduct(product['Tracking ID'])}
										className='ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
									>
										<FaTrashAlt />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	)
}
