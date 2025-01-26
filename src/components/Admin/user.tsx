import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  useDisclosure,
} from '@nextui-org/react';

import { IoIosSearch } from 'react-icons/io';

export const columns = [
  { name: 'Nama Lengkap', uid: 'fullname' },
  { name: 'Role', uid: 'role' },
  { name: 'Nomor HP', uid: 'phone_num' },
  { name: 'Email', uid: 'email' },
  { name: 'Instagram', uid: 'instagram' },
  { name: 'Jenis Kelamin', uid: 'gender' },
  { name: 'Tanggal Lahir', uid: 'birth_date' },
  { name: 'Kuota', uid: 'quota' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function UserComponent() {
  const [Page, setPage] = useState();
  const rowsPerPage = 10;
  const [Users, setUsers] = useState([]);
  const [Search, setSearch] = useState('');
  const [SelectecUserId, setSelectecUserId] = useState('');
  const [QuotaAdded, setQuotaAdded] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function DataFetch() {
    axios.get(`/api/user`).then((ress: any) => {
      setUsers(ress?.data?.data || []);
    });
  }

  function AddUserQuota() {
    axios
      .put(`/api/user/top-up/${SelectecUserId}`, {
        add_quota: QuotaAdded,
      })
      .then(() => {
        DataFetch();
      });
  }

  useEffect(() => {
    DataFetch();
  }, [Search]);

  const pages = Math.ceil(Users.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (Page ? Page - 1 : 0) * rowsPerPage;
    const end = start + rowsPerPage;
    return Users.slice(start, end);
  }, [Page, Users]);
  const renderCell = useCallback((user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'instagram':
        return (
          <a
            target='_blank'
            href={`https://instagram.com/${user?.instagram}`}
            className='flex items-center gap-2'
          >
            {user?.instagram}
          </a>
        );
      case 'birth_date':
        return (
          <div className='flex items-center gap-2'>
            {dayjs(user?.birth_date)?.format('DD MMMM YYYY')}
          </div>
        );
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => {
                setSelectecUserId(user?.id);
                onOpen();
              }}
              className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
            >
              Tambah Kuota
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <p className='text-[32px] font-bold mb-12'>Pengguna</p>
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
          {(item: any) => (
            <TableRow key={item?.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* MODAL */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Tambah Kuota User
              </ModalHeader>
              <ModalBody>
                <Input
                  defaultValue='0'
                  variant='bordered'
                  placeholder='Masuukan Jumlah Kuota....'
                  className='max-w-[466px]'
                  type='tel'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  onChange={(e: any) =>
                    setQuotaAdded(
                      parseInt(e.target.value.replace(/[^0-9]/g, ''))
                    )
                  }
                />
              </ModalBody>
              <ModalFooter>
                <button
                  onClick={onClose}
                  type='submit'
                  className=' text-main border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
                >
                  Close
                </button>
                <button
                  onClick={() => AddUserQuota()}
                  type='submit'
                  className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
                >
                  Tambahkan
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
