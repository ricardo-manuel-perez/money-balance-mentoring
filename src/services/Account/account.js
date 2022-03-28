import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { query, where, updateDoc, doc } from "firebase/firestore";

export async function postAccount(accountData) {
    try {
        const newAccountData = await addDoc(
            collection(db, 'ACCOUNTS'),
            accountData
        );
        return newAccountData;
    } catch (error) {
        console.error(error);
    }
}

export function getAccountsQuery(userUid) {
    return query(
        collection(db, 'ACCOUNTS'),
        where("uid", "==", userUid)
    );
}

export async function updateAccount(id, updatedAccountData) {
    try {
        const selected = doc(db, "ACCOUNTS", id);
        const updatedAccount =  await updateDoc(selected, updatedAccountData);
        return updatedAccount;
    } catch (error) {
        console.error(error);
    }
}