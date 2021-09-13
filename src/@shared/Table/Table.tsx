import React from 'react';
import { styled } from '@linaria/react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import type { Column } from 'react-table';

type Props = {
  columns: Column[];
  data: {}[];
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

const Table: React.FC<Props> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy
  );

  return (
    <HTMLTable {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <TableHeadRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableHeaderCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </TableHeaderCell>
            ))}
          </TableHeadRow>
        ))}
        <TableHeadRow>
          <TableHeaderFilterCell colSpan={visibleColumns.length}>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </TableHeaderFilterCell>
        </TableHeadRow>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Row {...row.getRowProps()} data-testid={`table.row-${i}`}>
              {row.cells.map(cell => {
                return (
                  <TableColumn {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableColumn>
                );
              })}
            </Row>
          );
        })}
      </tbody>
    </HTMLTable>
  );
};

const HTMLTable = styled('table')`
  border-collapse: collapse;
`;

const TableHeadRow = styled('tr')`
  text-align: left;
  border-bottom: 1px solid var(--gray);
`;

const Row = styled('tr')`
  &:not(:last-child) {
    border-bottom: 1px solid var(--gray);
  }
`;

const TableColumn = styled('td')`
  margin: 0;
  padding: 1rem;
`;

const TableHeaderCell = styled('th')`
  margin: 0;
  padding: 1rem;
  line-height: 2;
`;

const TableHeaderFilterCell = styled('th')`
  margin: 0;
  padding: 0.5rem 1rem;
`;

export default Table;
