package com.jdlink.domain.Account;

import java.util.ArrayList;
import java.util.List;

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
     * 子功能列表
     */
    private List<Function> children = new ArrayList<>();

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

    public List<Function> getChildren() {
        return children;
    }

    public void setChildren(List<Function> children) {
        this.children = children;
    }

    /**
     * 增加孩子
     * @param function 孩子
     */
    public void addChild(Function function) {
        this.children.add(function);
    }

    /**
     * 删除孩子
     * @param function 孩子
     */
    public void removeChild(Function function) {
        this.children.remove(function);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Function function = (Function) o;

        if (id != function.id) return false;
        return functionName != null ? functionName.equals(function.functionName) : function.functionName == null;

    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (functionName != null ? functionName.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Function{" +
                "id=" + id +
                ", functionName='" + functionName + '\'' +
                ", children=" + children +
                '}';
    }
}
