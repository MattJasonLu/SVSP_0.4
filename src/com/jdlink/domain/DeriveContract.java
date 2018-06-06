package com.jdlink.domain;

/**
 * Created by matt on 2018/5/17.
 */
public class DeriveContract extends Contract{
    /**
     * 开户行
     */
    private String bankName;
    /**
     * 开户行账号
     */
    private String bankAccount;
    /**
     * 开票税率1
     */
    private TaxRate firstTaxRate;
    /**
     * 开票税率2
     */
    private TaxRate secondTaxRate;

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(String bankAccount) {
        this.bankAccount = bankAccount;
    }

    public TaxRate getFirstTaxRate() {
        return firstTaxRate;
    }

    public void setFirstTaxRate(TaxRate firstTaxRate) {
        this.firstTaxRate = firstTaxRate;
    }

    public TaxRate getSecondTaxRate() {
        return secondTaxRate;
    }

    public void setSecondTaxRate(TaxRate secondTaxRate) {
        this.secondTaxRate = secondTaxRate;
    }
}
