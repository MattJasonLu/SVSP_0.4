package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;

//污水/软水登记主表
public class Sewageregistration {

    private String laboratorySignatory;//化验室签收人

    private Client client;//公司

    private String sendingPerson;//送样人

    private boolean  water;//true 为污水，false 为软水

    public boolean isWater() {
        return water;
    }

    public void setWater(boolean water) {
        this.water = water;
    }

    public String getLaboratorySignatory() {
        return laboratorySignatory;
    }

    public void setLaboratorySignatory(String laboratorySignatory) {
        this.laboratorySignatory = laboratorySignatory;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getSendingPerson() {
        return sendingPerson;
    }

    public void setSendingPerson(String sendingPerson) {
        this.sendingPerson = sendingPerson;
    }

    @Override
    public String toString() {
        return "Sewageregistration{" +
                "laboratorySignatory='" + laboratorySignatory + '\'' +
                ", client=" + client +
                ", sendingPerson='" + sendingPerson + '\'' +
                '}';
    }
}
