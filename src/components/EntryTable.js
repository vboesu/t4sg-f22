import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';

import * as React from 'react';
import { useState } from 'react';

// Table component that displays entries on home screen

export default function EntryTable({ entries }) {

   const [sortOrder, setSortOrder] = useState(null);
   const [sortKey, setSortKey] = useState(null);

   const [sortedEntries, setSorted] = useState([]);

   // sort states
   const handleSort = (e) => {
      // if same key, switch order
      var newKey = e.target.dataset.key;
      var newOrder = newKey === sortKey ? (sortOrder === "asc" ? "desc" : "asc") : "asc";

      setSortOrder(newOrder);
      setSortKey(newKey);

      // the state won't update in time, so we have to pass the new key & order directly
      sortEntries(newKey, newOrder);
   }

   const sortEntries = (key, order) => {
      const sort_fn =
         order === "asc" ? (a, b) => a[key].localeCompare(b[key])
            : order === "desc" ? (a, b) => b[key].localeCompare(a[key])
               : undefined;

      setSorted(entries.sort(sort_fn));
   }

   // this is needed to update on add/delete when sorted
   if (sortKey && entries.length != sortedEntries.length) {
      sortEntries(sortKey, sortOrder);
   }

   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  {[{ key: "name", align: "left" }, { key: "link", align: "right" }].map((v) => (
                     <TableCell onClick={handleSort} data-key={v.key} align={v.align}>
                        <div style={{ display: "inline-flex", pointerEvents: "none" }}> {/* the pointer events are a little hack to force the click event on the table cell */}
                           {v.key.charAt(0).toUpperCase() + v.key.slice(1)}
                           <div style={{ marginLeft: "0.5rem", pointerEvents: "none" }}>
                              {
                                 sortKey === v.key
                                    ? (sortOrder === "asc" ? <div>▲</div> : <div>▼</div>)
                                    : <><div style={{ lineHeight: 0.8 }}>▲</div><div style={{ lineHeight: 0.8 }}>▼</div></>
                              }
                           </div>
                        </div>
                     </TableCell>
                  ))}
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {(sortedEntries.length ? sortedEntries : entries).map((entry) => (
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     <TableCell sx={{ "display": "flex", "flex-direction": "row", "justify-content": "flex-end" }}>
                        <EntryModal entry={entry} type="edit" />
                        <EntryModal entry={entry} type="delete" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
