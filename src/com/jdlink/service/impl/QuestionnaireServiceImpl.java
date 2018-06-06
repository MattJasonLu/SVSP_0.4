package com.jdlink.service.impl;

import com.jdlink.domain.Questionnaire;
import com.jdlink.domain.QuestionnaireAdmin;
import com.jdlink.mapper.QuestionnaireMapper;
import com.jdlink.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by matt on 2018/4/28.
 */
@Service
public class QuestionnaireServiceImpl implements QuestionnaireService {
    @Autowired
    QuestionnaireMapper questionnaireMapper;

    @Override
    public List<Questionnaire> list() {
        return questionnaireMapper.list();
    }

    @Override
    public List<Questionnaire> get(String clientId, String questionnaireId) {
        return questionnaireMapper.get(clientId, questionnaireId);
    }

    @Override
    public Questionnaire getById(String questionnaireId) {
        return questionnaireMapper.getById(questionnaireId);
    }

    @Override
    public List<Questionnaire> getByClientId(String clientId) {
        return questionnaireMapper.getByClientId(clientId);
    }

    @Override
    public List<QuestionnaireAdmin> listQuestionnaireAdmin() {
        return questionnaireMapper.listQuestionnaireAdmin();
    }

    @Override
    public void add(Questionnaire questionnaire) {
        questionnaireMapper.add(questionnaire);
    }

    @Override
    public void delete(String questionnaireId) {
        questionnaireMapper.delete(questionnaireId);
    }

    @Override
    public void update(Questionnaire questionnaire) {
        questionnaireMapper.update(questionnaire);
    }

    @Override
    public void signIn(String questionnaireId) {
        questionnaireMapper.signIn(questionnaireId);
    }

    @Override
    public void updateAttachmentUrl(Questionnaire questionnaire) {
        questionnaireMapper.updateAttachmentUrl(questionnaire);
    }


    @Override
    public void back(String quesionnaireId) {
        questionnaireMapper.back(quesionnaireId);
    }
}
