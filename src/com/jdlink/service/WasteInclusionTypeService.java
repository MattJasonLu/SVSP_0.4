package com.jdlink.service;

import com.jdlink.domain.WasteInclusionType;

import java.util.List;

/**
 * Created by matt on 2018/5/10.
 */
public interface WasteInclusionTypeService {
    List<WasteInclusionType> getByQuestionnaireId(String questionnaireId);
}
