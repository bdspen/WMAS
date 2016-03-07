describe('Services', function() {
    var UserService;
    var AuthService;
    var MapService;
    var MessageService;
    var FirebaseService;

    beforeEach(module('WM'));
    beforeEach(inject(function(_UserService_, _AuthService_, _MapService_, _MessageService_, _FirebaseService_){
        UserService = _UserService_;
        AuthService = _AuthService_;
        MapService = _MapService_;
        MessageService = _MessageService_;
        FirebaseService = _FirebaseService_;
    }));
//FIREBASE
    describe('function', function(){
        it('returns a fb object', function(){
            expect(typeof FirebaseService).toBe('object');
        });
    });
// USERS
    describe('function', function(){
        it('returns an array', function(){
            UserService().$loaded().then(function(data){
                var data = data;
                expect(data.isArray()).toBe(true);
            });
        });
    });
// AUTH
    describe('function', function(){
        it('returns an authObject', function(){
            expect(typeof AuthService).toBe('object');
        });
    });
// MAPS
    describe('function', function(){
        it('returns a MapObj', function(){
            // console.log(MapService);
            expect(typeof MapService).toBe('object');
        });
    });
    describe('function', function(){
        it('returns a MessageObj', function(){
            // console.log(MessageService);
            expect(typeof MessageService).toBe('object');
        });
        // it('returns a Message from user one to user two', function(){
        //     MessageService.create("Hello");
        //     expect().toBe('object');
        // });
    });

});
