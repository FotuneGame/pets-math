import { useState } from "react";

export const useTablePagination = (defaultRows: number) => {
    const [page, setPage] = useState<number>(0); // MUI Pagination использует индексацию с 0
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRows);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event:React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    return {page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}
}