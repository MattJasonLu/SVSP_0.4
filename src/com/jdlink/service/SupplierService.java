package com.jdlink.service;

import com.jdlink.domain.Supplier;

import java.util.List;

/**
 * Created by matt on 2018/5/17.
 */
public interface SupplierService {

    void add(Supplier supplier);

    void delete(String supplierId);

    void enable(String supplierId);

    void disable(String supplierId);

    Supplier getBySupplierId(String supplierId);

    Supplier getByName(String companyName);

    List<Supplier> getByKeyword(String keyword);

    void update(Supplier supplier);

    List<Supplier> list();

    void setCheckStateToSubmit(String supplierId);

    void setCheckStateExamining(String supplierId);

    void setCheckStateFinished(String supplierId);

    int count();

}
