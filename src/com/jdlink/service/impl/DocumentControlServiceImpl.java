package com.jdlink.service.impl;

import com.jdlink.domain.Produce.DocumentControl;
import com.jdlink.mapper.DocumentControlMapper;
import com.jdlink.service.DocumentControlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
@Service
public class DocumentControlServiceImpl implements DocumentControlService {

    @Autowired
    DocumentControlMapper documentControlMapper;


    @Override
    public List<DocumentControl> list(DocumentControl documentControl) {
        return documentControlMapper.list(documentControl);
    }

    @Override
    public int count(DocumentControl documentControl) {
        return documentControlMapper.count(documentControl);
    }

    @Override
    public void add(DocumentControl documentControl) {
        documentControlMapper.add(documentControl);
    }

    @Override
    public DocumentControl get(String ID) {
        return documentControlMapper.get(ID);
    }

    @Override
    public void setInvalid(String ID) {
        documentControlMapper.setInvalid(ID);
    }

    @Override
    public void setEffective(String ID) {
        documentControlMapper.setEffective(ID);
    }

    @Override
    public void setUnEffective(String ID) {
        documentControlMapper.setUnEffective(ID);
    }
}
