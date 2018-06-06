package com.jdlink.mapper;

import com.jdlink.domain.SampleCheck;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface SampleCheckMapper {

    void add(SampleCheck sampleCheck);

    void delete(String checkId);

    SampleCheck getById(String checkId);

    List<SampleCheck> list();

}
