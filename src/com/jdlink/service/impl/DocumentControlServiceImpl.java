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
}
