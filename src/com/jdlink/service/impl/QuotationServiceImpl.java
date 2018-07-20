package com.jdlink.service.impl;

import com.jdlink.domain.Quotation;
import com.jdlink.mapper.QuotationMapper;
import com.jdlink.service.QuotationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/7/3.
 */
@Service
public class QuotationServiceImpl implements QuotationService {
    @Autowired
    QuotationMapper quotationMapper;


    @Override
    public void add(Quotation quotation) {
        quotationMapper.add(quotation);
    }

    @Override
    public void update(Quotation quotation) {
        quotationMapper.update(quotation);
    }

    @Override
    public void levelUp(Quotation quotation) {
        quotationMapper.levelUp(quotation);
    }

    @Override
    public List<Quotation> list() {
        return quotationMapper.list();
    }

    @Override
    public List<Quotation> list(String state) {
        return quotationMapper.list(state);
    }

    @Override
    public List<Quotation> listNotInvalid() {
        return quotationMapper.listNotInvalid();
    }

    @Override
    public int count() {
        return quotationMapper.count();
    }

    @Override
    public Quotation getById(String id) {
        return quotationMapper.getById(id);
    }

    @Override
    public Quotation getByQuotationId(String quotationId) {
        return quotationMapper.getByQuotationId(quotationId);
    }

    @Override
    public void setStateDisabled(String id) {
        quotationMapper.setStateDisabled(id);
    }

    @Override
    public void changeEndDate(Quotation quotation) {
        quotationMapper.changeEndDate(quotation);
    }

    @Override
    public void approval(String advice,String id) { quotationMapper.approval(advice,id); }

    @Override
    public void reject(String advice,String id) { quotationMapper.reject(advice,id); }

    @Override
    public List<Quotation> getByKeyword(String keyword) {
        return quotationMapper.getByKeyword(keyword);
    }
}
