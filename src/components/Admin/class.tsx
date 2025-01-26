import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  parseDate,
  parseAbsoluteToLocal,
  CalendarDateTime,
} from '@internationalized/date';

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
  DatePicker,
  Select,
  SelectItem,
} from '@nextui-org/react';

import { IoIosSearch } from 'react-icons/io';

export const columns = [
  { name: 'Kategori', uid: 'category' },
  { name: 'Studio', uid: 'studio' },
  { name: 'Jam Mulai', uid: 'start_at' },
  { name: 'Jam Selesai', uid: 'end_at' },
  { name: 'Durasi', uid: 'duration' },
  { name: 'Instruktur', uid: 'instructor' },
  { name: 'Deskripsi', uid: 'description' },
  { name: 'Kapasitas', uid: 'max_slot' },
  { name: 'Sisa Kapasitas', uid: 'current_slot' },
  { name: 'Kuota', uid: 'req_quota' },
];

export default function ClassComponent() {
  const [Page, setPage] = useState();
  const rowsPerPage = 10;
  const [Classes, setClasses] = useState([]);
  const [Search, setSearch] = useState('');
  const [SelectedStudio, setSelectedStudio] = useState<any>([]);
  const [ModalOpen, setModalOpen] = useState('');
  const [Categories, setCategories] = useState([]);
  const [Studios, setStudios] = useState([]);
  const [RequirementQuota, setRequirementQuota] = useState('');
  const [SelectedCategory, setSelectedCategory] = useState(0);
  const [StartAt, setStartAt] = useState<any>(() => {
    const now = new Date();
    return new CalendarDateTime(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );
  });
  const [EndAt, setEndAt] = useState<any>(() => {
    const now = new Date();
    return new CalendarDateTime(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );
  });
  const [FormData, setFormData] = useState({
    studio_id: '',
    description: '',
    instructor: '',
  });
  const [SelectedDate, setSelectedDate] = useState(
    parseDate(dayjs().format('YYYY-MM-DD'))
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function DataFetch() {
    axios
      .get(`/api/class?date=${SelectedDate}&category_id=Semua`)
      .then((ress: any) => {
        setClasses(ress?.data?.data || []);
      });
    axios.get(`/api/class-category`).then((ress: any) => {
      setCategories(ress?.data?.data || []);
    });
    axios.get(`/api/studio`).then((ress: any) => {
      setStudios(ress?.data?.data || []);
    });
  }

  function AddClass() {
    axios
      .post(`/api/class`, {
        ...FormData,
        start_at: dayjs(StartAt)?.format('YYYY-MM-DDTHH:mm[Z]'),
        end_at: dayjs(EndAt)?.format('YYYY-MM-DDTHH:mm[Z]'),
        req_quota: parseInt(RequirementQuota),
        category_id: SelectedCategory,
      })
      .then((ress) => {
        DataFetch();
        setFormData({
          ...FormData,
          studio_id: '',
          description: '',
          instructor: '',
        });
        setSelectedCategory(0);
        setRequirementQuota('');
        setStartAt(() => {
          const now = new Date();
          return new CalendarDateTime(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          );
        });
        setEndAt(() => {
          const now = new Date();
          return new CalendarDateTime(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          );
        });
      });
  }

  function UpdateClass() {
    axios
      .put(`/api/class/${SelectedStudio?.id}`, {
        ...FormData,
        start_at: dayjs(StartAt)?.format('YYYY-MM-DDTHH:mm[Z]'),
        end_at: dayjs(EndAt)?.format('YYYY-MM-DDTHH:mm[Z]'),
        req_quota: parseInt(RequirementQuota),
        category_id: SelectedCategory,
      })
      .then((ress) => {
        DataFetch();
        setFormData({
          ...FormData,
          studio_id: '',
          description: '',
          instructor: '',
        });
        setSelectedCategory(0);
        setRequirementQuota('');
        setStartAt(() => {
          const now = new Date();
          return new CalendarDateTime(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          );
        });
        setEndAt(() => {
          const now = new Date();
          return new CalendarDateTime(
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
            now.getHours(),
            now.getMinutes()
          );
        });
      });
  }

  function DeleteClass() {
    axios.delete(`/api/class/${SelectedStudio?.id}`).then((ress) => {
      console.log(ress);
      DataFetch();
    });
  }

  useEffect(() => {
    DataFetch();
  }, [Search]);

  const pages = Math.ceil(Classes?.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (Page ? Page - 1 : 0) * rowsPerPage;
    const end = start + rowsPerPage;
    return Classes?.slice(start, end);
  }, [Page, Classes]);
  const renderCell = useCallback((Classes: any, columnKey: any) => {
    const cellValue = Classes[columnKey];
    switch (columnKey) {
      case 'category':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize text-default-400'>
              {Classes?.category?.name}
            </p>
          </div>
        );
      case 'studio':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize text-default-400'>
              {Classes?.studio?.name}
            </p>
          </div>
        );
      case 'start_at':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize text-default-400'>
              {dayjs(Classes?.start_at).format('YYYY-MM-DD HH:mm')}
            </p>
          </div>
        );
      case 'end_at':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize text-default-400'>
              {dayjs(Classes?.end_at).format('YYYY-MM-DD HH:mm')}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className='flex items-center gap-2'>
            <button
              onClick={() => {
                setSelectedStudio(Classes);
                setFormData({
                  ...FormData,
                  studio_id: Classes?.studio_id,
                  description: Classes?.description,
                  instructor: Classes?.instructor,
                });
                setRequirementQuota(Classes?.req_quota);
                setModalOpen('Hapus');
                onOpen();
              }}
              type='submit'
              className='bg-[#9a4b2c] text-white border-2 border-[#9a4b2c] py-1 px-6 text-sm rounded w-fit'
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedStudio(Classes);
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
      <p className='text-[32px] font-bold mb-12'>Kelas</p>
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
        <DatePicker
          className='max-w-[200px]'
          defaultValue={SelectedDate}
          value={SelectedDate}
          onChange={(newDate: any) => setSelectedDate(newDate)}
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
          {(item: any) => (
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
                    <Select
                      value={SelectedCategory}
                      placeholder='Pilih kategori kelas'
                    >
                      {Categories?.map((category: any, indexCategory: any) => (
                        <SelectItem
                          onPress={() => setSelectedCategory(category?.id)}
                          key={indexCategory}
                          value={category?.id}
                        >
                          {category?.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      value={FormData?.studio_id}
                      placeholder='Pilih studio kelas'
                    >
                      {Studios?.map((studio: any, indexCategory: any) => (
                        <SelectItem
                          onPress={() => {
                            setFormData({
                              ...FormData,
                              studio_id: studio?.id,
                            });
                          }}
                          key={indexCategory}
                          value={studio?.id}
                        >
                          {studio?.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <DatePicker
                      granularity='minute'
                      className='max-w-[466px]'
                      value={StartAt}
                      onChange={setStartAt}
                    />
                    <DatePicker
                      granularity='minute'
                      className='max-w-[466px]'
                      value={EndAt}
                      onChange={setEndAt}
                    />
                    <Input
                      variant='bordered'
                      placeholder='Masukan deskripsi kelas'
                      className='max-w-[466px]'
                      value={FormData?.description}
                      onChange={(e: any) =>
                        setFormData({
                          ...FormData,
                          description: e?.target?.value,
                        })
                      }
                    />
                    <Input
                      variant='bordered'
                      placeholder='Masukan nama instuktur'
                      className='max-w-[466px]'
                      value={FormData?.instructor}
                      onChange={(e: any) =>
                        setFormData({
                          ...FormData,
                          instructor: e?.target?.value,
                        })
                      }
                    />
                    <Input
                      variant='bordered'
                      placeholder='Masukan requirement kuota'
                      className='max-w-[466px]'
                      value={RequirementQuota}
                      onChange={(e: any) =>
                        setRequirementQuota(e?.target?.value)
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
                      AddClass();
                      onClose();
                    }
                    if (ModalOpen === 'Edit') {
                      UpdateClass();
                      onClose();
                    }
                    if (ModalOpen === 'Hapus') {
                      DeleteClass();
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
