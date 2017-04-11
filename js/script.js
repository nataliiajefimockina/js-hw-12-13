'use strict';
$(function() {
    var $database = {
        header: 'Тест по программированию',
        questions: [{
            title: 'Вопрос №1',
            radioname: 'first',
            id: ['1', '2', '3'],
            answers: ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'],
            correct: 1
            },
            {
                title: 'Вопрос №2',
                radioname: 'second',
                id: ['4','5','6'],
                answers:['Вариант ответа №1','Вариант ответа №2','Вариант ответа №3'],
                correct: 5
            },
            {
                title: 'Вопрос №3',
                radioname: 'third',
                id: ['7','8','9'],
                answers:['Вариант ответа №1','Вариант ответа №2','Вариант ответа №3'],
                correct: 9
            }],
        submit: 'Проверить мои результаты'
    };

    localStorage.setItem('test', JSON.stringify($database));

    var $data = JSON.parse(localStorage.getItem('test'));

    var $html = $('#test').html();
    var $content = tmpl($html, $data);
    $('.container').append($content);

    function showModal(e) {

        var $modal = $('<div class="modal"></div>');
        var $result = 0;
        var $answer = $('input:checked');
        var $correct = [];

        for (var i = 0; i<$data.questions.length; i++) {
            $correct[i] = $data.questions[i].correct;
            if ($($answer[i]).attr('id') == $correct[i]) {
                $result += 1;
                $modal.append('<p class="correct">Ответ на вопрос ' + (i+1) + ' правильный</p>');
            } else {
                $modal.append('<p class="incorrect">Ответ на вопрос ' + (i+1) + ' неправильный</p>');
            }
        }

        if ($result == $data.questions.length) {
            $modal.append('<h4>Поздравляем! Вы успешно прошли тест!</h4>');
        } else {
            $modal.append('<h4>Tест не пройден!</h4>');
        }

        $modal.append('<button>Закрыть</button>');
        $('body').append($modal);

        $('button').one('click', function (e) {
            e.preventDefault();
            $modal.detach();
            $('input').attr('checked', false);
        })
    }

    $('button').on('click', showModal);

      return this;
});
