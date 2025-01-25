import React, { useState, useCallback, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Input,
} from '@nextui-org/react';

import { IoIosSearch } from 'react-icons/io';

export const studios = [
  {
    key: '1',
    name: 'Tony Reichert',
    role: 'CEO',
    status: 'Active',
  },
  {
    key: '2',
    name: 'Zoey Lang',
    role: 'Technical Lead',
    status: 'Paused',
  },
  {
    key: '3',
    name: 'Jane Fisher',
    role: 'Senior Developer',
    status: 'Active',
  },
  {
    key: '4',
    name: 'William Howard',
    role: 'Community Manager',
    status: 'Vacation',
  },
  {
    key: '5',
    name: 'Emily Collins',
    role: 'Marketing Manager',
    status: 'Active',
  },
  {
    key: '6',
    name: 'Brian Kim',
    role: 'Product Manager',
    status: 'Active',
  },
  {
    key: '7',
    name: 'Laura Thompson',
    role: 'UX Designer',
    status: 'Active',
  },
  {
    key: '8',
    name: 'Michael Stevens',
    role: 'Data Analyst',
    status: 'Paused',
  },
  {
    key: '9',
    name: 'Sophia Nguyen',
    role: 'Quality Assurance',
    status: 'Active',
  },
  {
    key: '10',
    name: 'James Wilson',
    role: 'Front-end Developer',
    status: 'Vacation',
  },
  {
    key: '11',
    name: 'Ava Johnson',
    role: 'Back-end Developer',
    status: 'Active',
  },
  {
    key: '12',
    name: 'Isabella Smith',
    role: 'Graphic Designer',
    status: 'Active',
  },
  {
    key: '13',
    name: 'Oliver Brown',
    role: 'Content Writer',
    status: 'Paused',
  },
  {
    key: '14',
    name: 'Lucas Jones',
    role: 'Project Manager',
    status: 'Active',
  },
  {
    key: '15',
    name: 'Grace Davis',
    role: 'HR Manager',
    status: 'Active',
  },
  {
    key: '16',
    name: 'Elijah Garcia',
    role: 'Network Administrator',
    status: 'Active',
  },
  {
    key: '17',
    name: 'Emma Martinez',
    role: 'Accountant',
    status: 'Vacation',
  },
  {
    key: '18',
    name: 'Benjamin Lee',
    role: 'Operations Manager',
    status: 'Active',
  },
  {
    key: '19',
    name: 'Mia Hernandez',
    role: 'Sales Manager',
    status: 'Paused',
  },
  {
    key: '20',
    name: 'Daniel Lewis',
    role: 'DevOps Engineer',
    status: 'Active',
  },
  {
    key: '21',
    name: 'Amelia Clark',
    role: 'Social Media Specialist',
    status: 'Active',
  },
  {
    key: '22',
    name: 'Jackson Walker',
    role: 'Customer Support',
    status: 'Active',
  },
  {
    key: '23',
    name: 'Henry Hall',
    role: 'Security Analyst',
    status: 'Active',
  },
  {
    key: '24',
    name: 'Charlotte Young',
    role: 'PR Specialist',
    status: 'Paused',
  },
  {
    key: '25',
    name: 'Liam King',
    role: 'Mobile App Developer',
    status: 'Active',
  },
];

export const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function StudioComponent() {
  const [Page, setPage] = useState();
  const rowsPerPage = 10;
  const pages = Math.ceil(studios.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (Page ? Page - 1 : 0) * rowsPerPage;
    const end = start + rowsPerPage;
    return studios.slice(start, end);
  }, [Page, studios]);
  const renderCell = useCallback((studios: any, columnKey: any) => {
    const cellValue = studios[columnKey];
    switch (columnKey) {
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize text-default-400'>
              {studios.team}
            </p>
          </div>
        );
      case 'status':
        return (
          <div className='flex items-center gap-2'>
            <div>{studios.status}</div>
          </div>
        );
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => console.log(studios)}
              type='submit'
              className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
            >
              Edit
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [Search, setSearch] = useState('');

  useEffect(() => {
    console.log(Search);
  }, [Search]);

  return (
    <>
      <p className='text-[32px] font-bold mb-12'>Studio</p>
      <div className='flex justify-end mb-4'>
        <Input
          defaultValue=''
          variant='bordered'
          placeholder='Search...'
          endContent={<IoIosSearch />}
          className='max-w-[466px]'
          onKeyDown={(event: any) => {
            if (event?.key === 'Enter') {
              setSearch(event?.target?.value);
            }
          }}
        />
      </div>
      <Table
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={Page}
              total={pages}
              onChange={(page: any) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              //   align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
