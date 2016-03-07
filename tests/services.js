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
            expect(typeof AuthService.anon).toBe('function');
            expect(typeof AuthService.saveUser).toBe('function');
        });
    });
// MAPS
    describe('function', function(){
        it('returns a MapObj', function(){
            expect(typeof MapService).toBe('object');
            expect(typeof MapService.refresh).toBe('function');
            expect(typeof MapService.initialize).toBe('function');
            expect(typeof MapService.convertToMapPoints).toBe('function');
            expect(typeof MapService.markers).toBe('object');
        });
    });
//MESSAGE
    describe('function', function(){
        it('returns a MessageObj', function(){
            expect(typeof MessageService).toBe('object');
            expect(typeof MessageService.create).toBe('function');
            expect(typeof MessageService.createPing).toBe('function');
            expect(typeof MessageService.removePing).toBe('function');
            expect(typeof MessageService.get).toBe('function');
            expect(typeof MessageService.delete).toBe('function');

        });
    });

});
