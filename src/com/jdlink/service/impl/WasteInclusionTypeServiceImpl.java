package com.jdlink.service.impl;

import com.jdlink.domain.WasteInclusionType;
import com.jdlink.mapper.WasteInclusionTypeMapper;
import com.jdlink.service.WasteInclusionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/5/10.
 */
@Service
public class WasteInclusionTypeServiceImpl implements WasteInclusionTypeService {
    @Autowired
    WasteInclusionTypeMapper wasteInclusionTypeMapper;

    @Override
    public List<WasteInclusionType> getByQuestionnaireId(String questionnaireId) {
        return wasteInclusionTypeMapper.getByQuestionnaireId(questionnaireId);
    }
}
