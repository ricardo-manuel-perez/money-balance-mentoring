import { addDoc, collection, query, orderBy } from "firebase/firestore";
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

export function getTransactionsQuery(accountId) {
    return query(
        collection(db, 'ACCOUNTS/' + accountId + '/TRANSACTIONS'),
        orderBy('date', 'desc')
    );
}