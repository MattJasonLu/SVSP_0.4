package com.jdlink.mapper;

import com.jdlink.domain.Wastes;

import java.util.List;

public interface WastesMapper {

    List<Wastes> list();
    Wastes getByName(String name);

    void add(Wastes wastes);
}
