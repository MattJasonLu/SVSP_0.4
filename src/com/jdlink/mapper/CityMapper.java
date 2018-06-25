package com.jdlink.mapper;

import com.jdlink.domain.City;

import java.util.List;

public interface CityMapper {
    public List<City> getCity(String provinceId) ;

}
