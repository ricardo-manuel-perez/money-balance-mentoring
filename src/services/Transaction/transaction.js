import { addDoc, collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase";

export async function postTransaction(accountId, transactionData) {
    try {
        const newTransactionData = await addDoc(
            collection(
              db,
              `ACCOUNTS`,
              `${accountId}/TRANSACTIONS`
            ),
            transactionData
        );
        return newTransactionData;
    } catch (error) {
        console.error(error);
    }
}

export function getTransactionsQuery(accountId, filter = null) {
    let queryConstrtaints = [];

    if(filter.type === 1 || filter.type === 2)
        queryConstrtaints.push(where("type", "==", filter.type));

    if(filter?.date?.from !== undefined ) {
        let from = Date.parse(filter?.date?.from)
        queryConstrtaints.push(where("date", ">", from));
    }    
    
    if(filter?.date?.to !== undefined ) {
        let to = Date.parse(filter?.date?.to)
        queryConstrtaints.push(where("date", "<", to));
    }

    queryConstrtaints.push(orderBy('date', 'desc'))

    let transactionsQuery = query(
        collection(db, 'ACCOUNTS/' + accountId + '/TRANSACTIONS'),
        ...queryConstrtaints
    );

    return transactionsQuery;
}