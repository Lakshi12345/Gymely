import Member from "../models/Member";
import Memberships from "../models/Memberships";
import Transaction from "../models/Transaction";

import {generateInvoice} from "../utils/invoiceGenerator";

export const addMembar = async (gymId : string, memberData : any)=>{

    const memberPayload = {
        fullName:
        memberData.fullName,

        mobile:
        memberData.mobile,

        email:
        memberData.email,

        gender:
        memberData.gender,

        profile:
        memberData.profile,
        gymId
    };

    const  resMember = await Member.create([memberPayload]);

    const cost = Number( memberData.amount);
    const discount = Number(memberData.discount);
    const  totalAmount = cost  - discount;
    const  currentInstallment = Number(memberData.currentInstallment)
    const  remaining = cost  - currentInstallment;

    const membershipsPayload =  {
        name: memberData.fullName,
        mobile: memberData.mobile,
        planName : memberData.planName,
        cost : cost,
        discount : discount,
        totalAmount : totalAmount,
        currentInstallment,
        remaining,
        online : Number(memberData.online),
        cash : Number(memberData.cash),
        cheque : Number(memberData.cheque),
        startDate : new Date(memberData.startDate),
        expiryDate : new Date(memberData.expiryDate),
        paymentDate : new Date(memberData.paymentDate),
        nextPaymentDate : new Date(memberData.nextPaymentDate),
        gymId,
    }

    const resMemberShips  = await Memberships.create([membershipsPayload]);

    const transactionPayload = {
        name: membershipsPayload.name,
        mobile: membershipsPayload.mobile,
        planName : membershipsPayload.planName,
        cost : membershipsPayload.cost,
        discount : membershipsPayload.discount,
        totalAmount : membershipsPayload.totalAmount,
        currentInstallment : membershipsPayload.currentInstallment,
        remaining : membershipsPayload.remaining,
        online : membershipsPayload.online,
        cash : membershipsPayload.cash,
        cheque : membershipsPayload.cheque,
        startDate : membershipsPayload.startDate,
        expiryDate : membershipsPayload.expiryDate,
        paymentDate : membershipsPayload.paymentDate,
        nextPaymentDate : membershipsPayload.nextPaymentDate,
        gymId,
    }

    const resTransactions = await Transaction.create([transactionPayload]);

    return {
        members : resMember[0],
        memberships : resMemberShips[0],
        transaction : resTransactions[0],
    } ;
}

export const getMember  = async (gymId : string)=>{
    return await Member.find({gymId : gymId});
}

export const getBills   = async (gymId : string)=>{
    const response =  await Transaction.find({gymId : gymId}).lean();

    // const formatDate = (date?: Date)=>{
    //     return date ? new Date(date).toLocaleDateString("en-GB") : null
    // };
    const formatDate =
        (
            date?:
                Date
                |
                null
        ) => {

            return date

                ?

                new Date(
                    date
                )

                    .toLocaleDateString(
                        "en-GB"
                    )

                :

                null;

        };

    return response.map((bill)=>({
        ...bill,
        startDate : formatDate(bill.startDate),
        expiryDate : formatDate(bill.expiryDate),
        paymentDate : formatDate(bill.paymentDate),
        nextPaymentDate : formatDate(bill.nextPaymentDate),

    })
    );
}

export  const getInvoice  = async (gymID : string, id: string)=>{
    const bill = await Transaction.findOne({gymId: gymID,_id : id}).lean();

    if(!bill){
        throw new Error("Invoice Not Found");
    }

    return await generateInvoice(bill);

}