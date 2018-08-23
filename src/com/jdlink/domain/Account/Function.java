package com.jdlink.domain.Account;

/**
 * Created by matt on 2018/8/23.
 * DoubleClickTo 666
 * 功能
 */
public class Function {
    /**
     * 编号
     */
    private int id;
    /**
     * 功能名称
     */
    private String functionName;
    /**
     * 父功能
     */
    private Function parentFunction;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public Function getParentFunction() {
        return parentFunction;
    }

    public void setParentFunction(Function parentFunction) {
        this.parentFunction = parentFunction;
    }

    @Override
    public String toString() {
        return "Function{" +
                "id=" + id +
                ", functionName='" + functionName + '\'' +
                ", parentFunction=" + parentFunction +
                '}';
    }
}
