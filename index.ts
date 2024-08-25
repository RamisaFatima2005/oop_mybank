#!/usr/bin/env node
import inquirer from "inquirer"

//bank acc interface

interface BankAccount{
     accNo:number;
     balance:number;
     withDraw(amount:number):void;
     deposit(amount:number):void;
     checkBalance():void;
}

//bank acc class
class BankAcc implements BankAccount{
    accNo: number;
    balance: number;
    
    constructor(acc:number,b:number){
        this.accNo=acc
        this.balance=b
    }

    //debit money or withdraw
    withDraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successfully! Your remaining balance is $${this.balance}`);
            
        }else{
            console.log("Insufficient Balance..."); 
        }
    }

    //deposit money OR credit money
    deposit(amount: number): void {
        if(amount > 100){
            //$1 deducted when deposit is greater than $100
            amount -=1
        }
        this.balance += amount
        console.log(`$${amount} deposited successfully! Your remaining balance is $${this.balance}`);
    }

    //check balance
    checkBalance(): void {
        console.log(`Your current balance is $${this.balance}`);
    }
}

//customer class
class Customer{
    fName:string
    lName:string
    gender:string
    age:number
    mblNo:number
    account:BankAcc

    constructor(f:string,l:string,g:string,a:number,m:number,acct:BankAcc){
        this.fName=f
        this.lName=l
        this.gender=g
        this.age=a
        this.mblNo=m
        this.account=acct
    }
}

//create bank accounts
const accounts:BankAcc[]=[
    new BankAcc(1111,500),
    new BankAcc(2222,800),
    new BankAcc(3333,1000)
]

//create customer
const customers:Customer[]=[
    new Customer("Misbah","Siddiqui","female",18,12304567809,accounts[0]),
    new Customer("Mehak","Naz","female",20,20230454789,accounts[1]),
    new Customer("Sobia","Munawwar","female",23,11230456349,accounts[2])
]

//create function to interact bank account
async function service(){
    do{
        const accNumInput = await inquirer.prompt([
            {
                name:"accNum",
                type:"number",
                message:"Enter your account number!"
            }
        ]);
        const customer = customers.find(customer =>customer.account.accNo == accNumInput.accNum)
        if(customer){
            console.log(`Welcome ${customer.fName} ${customer.lName}!`);

            const ask=await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"Select an operation!",
                choices:["Deposit","Withdraw","Check Balance","Exit"]
            }]);

            switch(ask.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt([{
                        name:"amount",
                        type:"number",
                        message:"Kindly enter the amount to deposit"
                    }]);
                    customer.account.deposit(depositAmount.amount)
                    break;

                        case "Withdraw":
                            const withDrawAmount = await inquirer.prompt([{
                                name:"amount",
                                type:"number",
                                message:"Kindly enter the amount to withdraw"
                            }]);
                            customer.account.withDraw(withDrawAmount.amount);
                            break;

                            case "Check Balance":
                            customer.account.checkBalance();
                            break;

                            case "Exit":
                                console.log("Exiting...");
                                console.log("Thank You for using our bank services");
                                console.log(("Have a nice day"));
                                return;
            }
        }else{
            console.log("Invalid account number!Kindly Enter a valid account number");
            
        }
    }while(true)
    }
    service()