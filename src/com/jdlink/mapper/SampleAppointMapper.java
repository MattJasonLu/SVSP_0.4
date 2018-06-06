package com.jdlink.mapper;

import com.jdlink.domain.SampleAppoint;
import com.jdlink.domain.SampleCheck;

import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface SampleAppointMapper {

    void add(SampleAppoint sampleAppoint);

    void delete(String appointId);

    SampleAppoint getById(String appointId);

    int countById(String appointId);

    List<SampleAppoint> list();

    List<SampleAppoint> getByKeyword(String keyword);

    void updatePdtAndCode(SampleCheck sampleCheck);

    void setAppointed(SampleAppoint sampleAppoint);

    void setSampleTaked(SampleAppoint sampleAppoint);

    void setCanceld(SampleAppoint sampleAppoint);

}
