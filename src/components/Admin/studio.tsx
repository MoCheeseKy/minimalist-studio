import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

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
  { name: 'Nama', uid: 'name' },
  { name: 'Kapasitas', uid: 'capacity' },
  { name: 'Lokasi', uid: 'location' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function StudioComponent() {
  const [Page, setPage] = useState();
  const rowsPerPage = 10;
  const [Studios, setStudios] = useState([]);
  const [Search, setSearch] = useState('');
  const [SelectedStudio, setSelectedStudio] = useState<any>([]);
  const [ModalOpen, setModalOpen] = useState('');
  const [FormData, setFormData] = useState({
    name: '',
    capacity: '',
    location: '',
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function DataFetch() {
    axios.get(`/api/studio`).then((ress: any) => {
      setStudios(ress?.data?.data || []);
    });
  }

  function AddStudio() {
    axios
      .post(`/api/studio`, {
        ...FormData,
      })
      .then((ress) => {
        console.log(ress);
        DataFetch();
        setFormData({ ...FormData, name: '', capacity: '', location: '' });
      });
  }

  function UpdateStudio() {
    axios
      .put(`/api/studio/${SelectedStudio?.id}`, {
        ...FormData,
      })
      .then((ress) => {
        console.log(ress);
        DataFetch();
        setFormData({ ...FormData, name: '', capacity: '', location: '' });
      });
  }

  function DeleteStudio() {
    axios.delete(`/api/studio/${SelectedStudio?.id}`).then((ress) => {
      console.log(ress);
      DataFetch();
    });
  }

  useEffect(() => {
    DataFetch();
  }, [Search]);

  const pages = Math.ceil(Studios.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (Page ? Page - 1 : 0) * rowsPerPage;
    const end = start + rowsPerPage;
    return Studios.slice(start, end);
  }, [Page, Studios]);
  const renderCell = useCallback((Studios: any, columnKey: any) => {
    const cellValue = Studios[columnKey];
    switch (columnKey) {
      case 'location':
        return (
          <a
            target='_blank'
            href={`${Studios?.location}`}
            className='flex items-center gap-2'
          >
            {Studios?.location}
          </a>
        );
      case 'capacity':
        return (
          <div className='flex items-center gap-2'>
            {Studios?.capacity} Orang
          </div>
        );
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => {
                setSelectedStudio(Studios);
                setFormData({
                  ...FormData,
                  name: Studios?.name,
                  capacity: Studios?.capacity,
                  location: Studios?.location,
                });
                setModalOpen('Edit');
                onOpen();
              }}
              type='submit'
              className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedStudio(Studios);
                setModalOpen('Hapus');
                onOpen();
              }}
              type='submit'
              className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
            >
              Hapus
            </button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <p className='text-[32px] font-bold mb-12'>Studio</p>
      <div className='flex justify-end mb-4 gap-4'>
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
        <button
          onClick={() => {
            setModalOpen('Tambah');
            onOpen();
          }}
          className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
        >
          Tambah
        </button>
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

      {/* MODAL */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {ModalOpen} Studio
              </ModalHeader>
              <ModalBody>
                {ModalOpen === 'Hapus' &&
                  'Apakah anda yakin untuk menghapus studio ini?'}
                {ModalOpen !== 'Hapus' && (
                  <>
                    <Input
                      variant='bordered'
                      placeholder='Masukan Nama Studio'
                      className='max-w-[466px]'
                      value={FormData?.name}
                      onChange={(e: any) =>
                        setFormData({ ...FormData, name: e?.target?.value })
                      }
                    />
                    <Input
                      variant='bordered'
                      placeholder='Masukan Kapasitas Studio'
                      className='max-w-[466px]'
                      value={FormData?.capacity}
                      onChange={(e: any) =>
                        setFormData({ ...FormData, capacity: e?.target?.value })
                      }
                    />
                    <Input
                      variant='bordered'
                      placeholder='Masukan Lokasi Studio'
                      className='max-w-[466px]'
                      value={FormData?.location}
                      onChange={(e: any) =>
                        setFormData({ ...FormData, location: e?.target?.value })
                      }
                    />
                  </>
                )}
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
                  onClick={() => {
                    if (ModalOpen === 'Tambah') {
                      AddStudio();
                      onClose();
                    }
                    if (ModalOpen === 'Edit') {
                      UpdateStudio();
                      onClose();
                    }
                    if (ModalOpen === 'Hapus') {
                      DeleteStudio();
                      onClose();
                    }
                  }}
                  type='submit'
                  className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
                >
                  {ModalOpen}
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
