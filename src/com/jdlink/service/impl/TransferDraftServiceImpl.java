package com.jdlink.service.impl;

import com.jdlink.domain.Produce.TransferDraft;
import com.jdlink.mapper.TransferDraftMapper;
import com.jdlink.service.TransferDraftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/8/2.
 */
@Service
public class TransferDraftServiceImpl implements TransferDraftService {

    @Autowired
    TransferDraftMapper transferDraftMapper;

    @Override
    public void add(TransferDraft transferDraft) {
        transferDraftMapper.add(transferDraft);
    }

    @Override
    public void setStateInvalid(String id) {
        transferDraftMapper.setStateInvalid(id);
    }

    @Override
    public TransferDraft getById(String id) {
        return transferDraftMapper.getById(id);
    }

    @Override
    public void update(TransferDraft transferDraft) {
        transferDraftMapper.update(transferDraft);
    }

    @Override
    public List<TransferDraft> list() {
        return transferDraftMapper.list();
    }

    @Override
    public int count() {
        return transferDraftMapper.count();
    }
}
