package com.jdlink.mapper;

import com.jdlink.domain.User;
import com.jdlink.domain.WasteInclusionType;

import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/23.
 */
public interface WasteInclusionTypeMapper {

    List<WasteInclusionType> getByQuestionnaireId(String questionnaireId);

}
