'use strict';    
    
//      
//  Reading file line by line synochronicaly libraries      
//      
//  Author: Chunfeng Yang      
//  All rights reserved.        
//  This software is supplied "AS IS" without any warranties and support.       
//  The author assumes no responsibility or liability for the use of the software,     
//  conveys no license or title under any patent, copyright, or mask work right to the product.      
//  The author reserves the right to make changes in the software without notification.      
//     
//    
//  Date: 2016-06-21    
//       Remove a bug in open function    
//    
//  Date: 2016-09-14    
//       Open the file path as constructor argument    
//    
//  Date: 2016-10-09    
//       Adding EOF() method    
//   
      
var fs = require('fs');    
    
module.exports = function( path ) {    
         
    this._leftOver = '';    
    this._EOF = false;    
    this._filename;    
    this._fd = 0;    
    this._bufferSize = 1024;    
    this._buffer = new Buffer(this._bufferSize);    
    
    this.open = function( thePath )     
    {     
        var self = this;    
        self._filename = thePath;    
    
        if(0 !== self._fd)    
        {    
             self.close();    
        }    
    
        try{    
            self._fd = fs.openSync( self._filename, 'r');     
        }     
        catch ( exception )    
        {    
            console.log( 'open(): ' + self._filename + ' not found.');    
            self._EOF = true;    
            return;    
        }     
        self._EOF = false;    
        return;    
    }    
    
   try{    
      fs.statSync( path ).isFile() ;     
      this.open( path );    
    }     
    catch ( exception )    
    {      
    }    
    
    this.EOF = function( )     
    {   
         return this._EOF;  
    }    
  
  
    this.close = function( )     
    {     
         var self = this;    
         try{    
             fs.closeSync(self._fd);     
         }    
         catch ( exception )    
         {    
              console.log( 'closing file failed.');    
         }    
         self._EOF = true;    
         self._fd = 0;     
         return;    
    }    
    
    this.next = function( )     
    {     
        var self = this;    
    
        if(0 == self._fd)    
        {    
             return;    
        }    
    
    var _idxStart = 0;    
        var idx;     
        if ((idx = self._leftOver.indexOf("\n", _idxStart)) == -1) {      
            var read;    
    
            try{    
                read = fs.readSync( self._fd, self._buffer, 0, self._bufferSize, null)    
            }     
            catch ( exception )    
            {    
                 console.log( 'reading file failed.');    
                 self.close();     
                 return;    
            }    
    
            if (read !== 0) {    
              self._leftOver  += self._buffer.toString('utf8', 0, read);    
            } else {    
                 try{    
                     fs.closeSync(self._fd);    
                  }    
                 catch ( exception )    
                 {    
                    console.log( 'closing file failed.');    
                 }    
                 self._EOF = true;    
                 self._fd = 0;     
                 return;    
            }    
         }    
          
        if ((idx = self._leftOver.indexOf("\n", _idxStart)) !== -1) {    
            var line = self._leftOver.substring(_idxStart, idx);    
    
            _idxStart = idx + 1;    
            self._leftOver = self._leftOver.substring(_idxStart);    
       
            return line;    
          }     
     }    
}    