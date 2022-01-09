import { useState, useEffect } from 'react';
import { db } from '..';
import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';
//redux
import { useSelector } from "react-redux";
import useSnackbar from './useSnackbar';

const tindakan = [
    {
        "text": "Sedang Dibuat",
        "value": 2
    },
    {
        "text": "Selesai Dibuat",
        "value": 3
    },
    {
        "text": "Sedang Diantar",
        "value": 4
    },
    {
        "text": "Sudah Diantar",
        "value": 5
    },
]

const usePesanan = (type) => {
    const [h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar] = useSnackbar();
    const [ic_st_orders, ic_st_setOrders] = useState([]);
    const [ic_st_isLoading, ic_st_setIsLoading] = useState(false);
    //redux 
    const r_currentTableNumber = useSelector((state) => state.currentTableNumber);
    //get order
    const handleUpdateStatus = async (v, obj, dl) => {
        try {
            const newObj = obj.map((o) => {
                if (o.id === dl.id) {
                    o.status = v
                }
                return o;
            })
            await updateDoc(doc(db, `order/${dl.meja}`), {
                list: newObj
            });
            h_sf_showSnackbar(`Pesanan dengan id ${dl.id} sekarang ${v}`, 'success');
            //recursively construct data with newly updated data
            await getOrder();
        } catch (err) {
            console.log(err.message);
            h_sf_showSnackbar(err.message, 'error');
        }
    }
    const getOrder = async () => {
        if (r_currentTableNumber === undefined) {
            h_sf_showSnackbar('Belum ada pesanan', 'error');
        } else {
            try {
                //ic_st_setIsLoading(true);
                const ref = collection(db, `order`);
                const orders = await getDocs(query(ref));
                const orderArr = [];
                orders.forEach((doc) => {
                    let filteredData = [];
                    const obj = doc.data()['list'] //obj to modify
                    doc.data()['list'].forEach((dl) => {
                        if (dl.category === type) {
                            console.log('match');
                            filteredData.push({
                                ...dl,
                                tindakanOption: tindakan,
                                defaultSelectedOption: dl.status,
                                handleUpdate: (v) => handleUpdateStatus(v, obj, dl)
                            });
                        }
                    })
                    orderArr.push({
                        id: doc.id,
                        list: filteredData
                    });
                });
                ic_st_setOrders(orderArr);
                //ic_st_setIsLoading(false);
            } catch (err) {
                console.log(err.message);
                //ic_st_setIsLoading(false);
            }
        }
    }
    useEffect(() => {
        //getting current customer order
        getOrder();
    }, [])

    return [ic_st_isLoading, ic_st_orders, h_st_isSnackbarShown, h_st_message, h_st_severity, h_sf_showSnackbar, h_sf_closeSnackbar];
}

export default usePesanan;
