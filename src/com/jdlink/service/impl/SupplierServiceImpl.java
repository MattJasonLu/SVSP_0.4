package com.jdlink.service.impl;

import com.jdlink.domain.Supplier;
import com.jdlink.mapper.SupplierMapper;
import com.jdlink.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/17.
 */
@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    SupplierMapper supplierMapper;

    @Override
    public void add(Supplier supplier) {
        supplierMapper.add(supplier);
    }

    @Override
    public void delete(String supplierId) {
        supplierMapper.delete(supplierId);
    }

    @Override
    public Supplier getBySupplierId(String supplierId) {
        return supplierMapper.getBySupplierId(supplierId);
    }

    @Override
    public Supplier getByName(String companyName) {
        return supplierMapper.getByName(companyName);
    }

    @Override
    public List<Supplier> get(String keyword) {
        return supplierMapper.get(keyword);
    }

    @Override
    public void update(Supplier supplier) {
        supplierMapper.update(supplier);
    }

    @Override
    public List<Supplier> list() {
        return supplierMapper.list();
    }

    @Override
    public void setCheckStateToSubmit(String supplierId) {
        supplierMapper.setCheckStateToSubmit(supplierId);
    }

    @Override
    public void setCheckStateExamining(String supplierId) {
        supplierMapper.setCheckStateExamining(supplierId);
    }

    @Override
    public void setCheckStateFinished(String supplierId) {
        supplierMapper.setCheckStateFinished(supplierId);
    }
}
