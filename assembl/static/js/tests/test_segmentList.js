define(['jasmine', 'backbone', 'underscore', 'zepto', 'app', 'views/segmentList'],
function(jasmine, Backbone, _, $, app, SegmentList){

    function getView(){
        var v = new SegmentList();

        setFixtures('<ul id="fix-segmentlist"></ul>');
        $('#fix-segmentlist').append( v.render().el );

        return v;
    }


    return describe('SegmentList view', function(){
        var view;

        beforeEach(function(){
            view = getView();
        });

        it('should add a new segment', function(){
            spyOn(SegmentList.prototype, 'render').andCallThrough();
            view = getView();

            view.addSegment({ text: 'nada' });

            expect(view.render).toHaveBeenCalled();
            expect(view.segments.length).toBe(1);
        });

        it('should remove a segment by its cid', function(){
            spyOn(SegmentList.prototype, 'render').andCallThrough();
            view = getView(); //render count: 1

            view.addSegment({ text: 'nada' }); //render count: 2
            expect(view.segments.length).toBe(1);

            var cid = view.segments.at(0).cid;
            view.removeSegmentByCid(cid); //render count: 3

            expect(view.segments.length).toBe(0);
            expect(view.render).toHaveBeenCalled();
            expect(view.render.callCount).toBe(3);
        });

        it('should remove a segment by clicking in the .closebutton', function(){
            view.addSegment({ text: 'nada' });
            expect(view.segments.length).toBe(1);

            view.$('.closebutton').trigger('click');
            expect(view.segments.length).toBe(0);
        });

        it('should set the app.draggedSegment as the current dragged segment', function(){
            view.addSegment({ text: 'nada' });
            view.$('.box').trigger('dragstart');

            expect(app.draggedSegment).toBe('.box');

            view.$('.box').trigger('dragend');
            expect(app.draggedSegment).toBe(null);
        });

        it('should remove the segment by click', function(){
            view.addSegment({ text: 'nada' });
            expect(view.segments.length).toBe(1);

            view.$('.closebutton').trigger('click');
            expect(view.segments.length).toBe(0);
        });

        it('should remove the segment by its wrapper', function(){
            view.addSegment({ text: 'nada' });
            expect(view.segments.length).toBe(1);

            var seg = view.$('.box').get(0);
            view.removeSegmentByWrapper(seg);
            expect(view.segments.length).toBe(0);
        });

    });

});